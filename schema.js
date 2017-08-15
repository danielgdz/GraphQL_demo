const axios = require('axios');

const GraphQLJSON = require('graphql-type-json');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

// Rate Type
const RateType = new GraphQLObjectType({
    name:'Rate',
    fields:() => ({
        id: {type:GraphQLInt},
        app_id: {type:GraphQLInt},
        company_id: {type:GraphQLInt},
        entity_id: {type:GraphQLInt},
        rat_type_rates_id: {type:GraphQLInt},
        entity_code: {type:GraphQLString},
        code_plan: {type:GraphQLString},
        date_start: {type:GraphQLString},
        date_end: {type:GraphQLString},
        name_rate: {type:GraphQLJSON},
        name_short: {type:GraphQLJSON},
        reservation_policy: {type:GraphQLJSON},
        languages: {type:GraphQLJSON},
        ranges: {type:GraphQLJSON},
        array_days: {type:GraphQLJSON},
        url_image: {type:GraphQLJSON},
        day_required: {type:GraphQLInt},
        time_required: {type:GraphQLInt},
        type_discount: {type:GraphQLInt},
        discount_promotion: {type:GraphQLString},
        currency: {type:GraphQLString},
        price: {type:GraphQLString},
        parent_id: {type:GraphQLInt},
        flag_img_promotion: {type:GraphQLBoolean},
        flag_active: {type:GraphQLBoolean},
        created_at: {type:GraphQLString},
        updated_at: {type:GraphQLString},
        deleted_at: {type:GraphQLString}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        rate:{
            type:RateType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.get('http://192.168.1.19:8200/rates/' + args.id)
                    .then(res => res.data);
            }
        },
        rates:{
            type: new GraphQLList(RateType),
            resolve(parentValue, args){
                return axios.get('http://192.168.1.19:8200/rates')
                    .then(res => res.data);
            }
        }
    },
});

// Mutations

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addRate:{
            type:RateType,
            args:{
                app_id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                return axios.post('http://192.168.1.19:8200/rates', args).then( res => res.data);
            }
        },
        deleteRate:{
            type:RateType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.delete('http://192.168.1.19:8200/rates/' + args.id)
                    .then( res => res.data);
            }
        },
        updateRate:{
            type:RateType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                app_id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                return axios.patch('http://192.168.1.19:8200/rates/' + args.id, args).then( res => res.data);
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});