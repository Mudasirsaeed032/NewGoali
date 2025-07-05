import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';  // Supabase client for authentication
import { useNavigate } from 'react-router-dom';  // For redirection in React Router v6

const SignUpPage = () => {
  const [isNewOrg, setIsNewOrg] = useState(false);  // Toggle between the two flows
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    fundraisingNeeds: '',
    invitationLink: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();  // Use navigate instead of useHistory

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate password confirmation for new organization flow
    if (isNewOrg && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      let user;

      // Start New Organization Flow
      if (isNewOrg) {
        // Sign up the user with email and password
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        if (!data?.user) throw new Error("User creation failed!");

        user = data.user;

        console.log("User after signUp:", user);

        // Create the team (organization creation)
        const { data: teamData, error: teamError } = await supabase
          .from('teams')
          .insert([{ name: formData.organizationName, admin_id: user.id }])
          .select(); // Ensure we explicitly request the inserted data

        console.log("Team data after insert:", teamData);  // Log the response from the insert
        console.error("Team creation error:", teamError); // Log any error if occurs

        if (teamError) {
          throw new Error(`Team creation failed: ${teamError.message}`);
        }

        if (!teamData || teamData.length === 0) {
          throw new Error("Team creation failed: No team data returned");
        }

        // Proceed with inserting the user as admin
        const { data: userData, error: userError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            role: 'admin',
            team_id: teamData[0].id,
            organization_name: formData.organizationName,
            signup_type: 'new_org',
          });

        if (userError) {
          throw new Error(`User insertion failed: ${userError.message}`);
        }

        alert('Organization created successfully!');
      } else {
        // Join Existing Team Flow
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        if (!data?.user) throw new Error("User creation failed!");

        user = data.user;

        // Validate invitation link (token from the invites table)
        const { data: inviteData, error: inviteError } = await supabase
          .from('invites')
          .select('*')
          .eq('token', formData.invitationLink)
          .single();

        if (inviteError || !inviteData) throw new Error('Invalid invitation link');

        // Join the team (update the user table to assign to team)
        await supabase
          .from('users')
          .upsert({
            id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            role: 'athlete',
            team_id: inviteData.team_id,
            phone_number: formData.phoneNumber || null,
            signup_type: 'join_team',
          });

        alert('Joined the team successfully!');
      }

      // Redirect to the appropriate dashboard after successful signup
      navigate('/');  // Use navigate instead of useHistory
    } catch (error) {
      console.error("Error during sign-up:", error);  // Log the error details
      alert(error.message || "An unexpected error occurred.");
    }
  };



  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      {/* Option Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsNewOrg(false)}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all ${!isNewOrg ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500'}`}
        >
          Join Existing Team
        </button>
        <button
          onClick={() => setIsNewOrg(true)}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all ${isNewOrg ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500'}`}
        >
          Start a New Organization
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp}>
        {/* Common Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conditional Fields */}
        {isNewOrg && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Fundraising Needs</label>
              <textarea
                name="fundraisingNeeds"
                value={formData.fundraisingNeeds}
                onChange={handleInputChange}
                required
                className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {!isNewOrg && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Invitation Link</label>
            <input
              type="text"
              name="invitationLink"
              value={formData.invitationLink}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isNewOrg && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone Number (Optional)</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium mt-6 hover:bg-blue-700 transition-colors">
          {isNewOrg ? 'Create Organization' : 'Join Team'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
