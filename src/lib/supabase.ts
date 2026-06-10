import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase if variables are configured, otherwise fall back to local handler
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (() => {
      // Local fallback adapter wrapping localStorage so the app remains fully functional
      // during local testing and development before credentials are set up.
      return {
        auth: {
          getSession: async () => {
            const data = localStorage.getItem('portal_active_user_v1');
            if (data) {
              try {
                const user = JSON.parse(data);
                return {
                  data: {
                    session: {
                      user: {
                        email: user.email,
                        id: 'local-user-id',
                        user_metadata: { name: user.name || '' }
                      }
                    }
                  },
                  error: null
                };
              } catch (e) {
                return { data: { session: null }, error: null };
              }
            }
            return { data: { session: null }, error: null };
          },
          signOut: async () => {
            localStorage.removeItem('portal_active_user_v1');
            return { error: null };
          },
          onAuthStateChange: (callback: any) => {
            // Return dummy subscription
            return { data: { subscription: { unsubscribe: () => {} } } };
          }
        }
      } as any;
    })();
