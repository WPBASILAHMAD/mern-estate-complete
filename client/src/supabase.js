import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrlpriwjnfeycdllzrmu.supabase.co'; 
const supabaseKey = 'sb_publishable_EyhNRQQ8JEOep40W9OeYGQ_HrBfeqEN'; 

export const supabase = createClient(supabaseUrl, supabaseKey);