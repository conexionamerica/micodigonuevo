import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uybiseugdckzadrakfqa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YmlzZXVnZGNremFkcmFrZnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NzAxMDMsImV4cCI6MjA3ODE0NjEwM30.1pts8rK7cQsWdEb-NvNa39Iz_rZF2OvYVhpTzZnrlqg';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
