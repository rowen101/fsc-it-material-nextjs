import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const response = await axios
          .post(process.env.BASE_API + "/login", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((resp) => {
            return resp.data;
          })
          .catch((err) => {
            throw new Error(err);
          });

        if (!response.user) {
          throw new Error("No user found!");
        }

        return { user: response.user, token: response.token };
      },
    }),
  ],
});
