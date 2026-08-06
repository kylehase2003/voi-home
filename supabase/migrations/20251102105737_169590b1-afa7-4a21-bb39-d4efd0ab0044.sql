-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;

-- Allow users to view their own roles
CREATE POLICY "Users can view own roles"
ON user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Keep the admin management policy
-- (Admins can manage roles policy already exists)