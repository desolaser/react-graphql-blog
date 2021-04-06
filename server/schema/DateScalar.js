const graphql = require('graphql')
const {
  GraphQLScalarType,
  Kind
} = graphql

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type",
  parseValue(value) {
      return new Date(value); // value from the client input variables
  },
  serialize(value) {
      return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
          return new Date(ast.value); // value from the client query
      }
      return null;
  },
});

module.exports = DateScalar