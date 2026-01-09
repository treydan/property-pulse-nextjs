import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          accet_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successfully sign in
    async signIn({ profile }) {
      // 1. connect to the db
      // 2. check if user exists
      // 3. if not, create user
      // 4. return true to allow sign in
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. connect to the db
      // 2. get the user from the db
      // 3. assign user id from the session
      // 4. return the session
    },
  },
};
