import Express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import schemas from "./mongoose.js";

const typeDefs = `
  type City {
    city: String
  }

  type Query {
    getCity: [City]
  }

`;

const resolvers = {
  Query: {
    getCity: async () => {
      try {
        console.log("Searching data");
        const data = await schemas.find({ _id: "01001" });
        // Assuming schemas returns an array of documents
        // For simplicity, just return the first city found
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch city data");
      }
    },
  },
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = Express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  const data = schemas.find({}).then((data) => {
    res.send(data);
  });
});

app.listen(4000, () => {
  console.log("Hi server is in running state.");
});
