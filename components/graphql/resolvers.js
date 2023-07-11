const Recipe = require('../models/Recipe')

const resolvers = {
    Query: {
        async recipes(_, { ID }) {
            return await Recipe.findById(ID)
        },
        async getRecipe(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount)
        }
    },
    Mutation: {
        async createRecipe(_, { recipeInput: { name, description } }) {
            const newRecipe = new Recipe({
                name,
                description,
                createdAt: new Date().toISOString()
            });
            const res = await newRecipe.save()
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_, { ID }) {
            const deleted = (await Recipe.deleteOne({ _id: ID })).deletedCount
            return deleted
        },
        async editRecipe(_, {ID, recipeInput: { name, description } }) {
            const updated = (await Recipe.updateOne({
                _id: ID
            }, {
                $set: {
                    name: name,
                    description: description
                }
            })).modifiedCount
            return updated
        }
    }
}

module.exports = resolvers;