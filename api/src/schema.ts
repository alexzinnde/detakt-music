import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType
} from 'nexus'
import {DateTimeResolver} from 'graphql-scalars'
import {Context} from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allDemos', {
      type: 'Demo',
      resolve: (_parent, _args, context) => {
        return context.prisma.demo.findMany()
      }
    })

    t.nullable.field('demoById', {
      type: 'Demo',
      args: {
        id: intArg()
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.demo.findUnique({
          where: {id: args.id || undefined}
        })
      }
    })
  }
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('submitDemo', {
      type: 'Demo',
      args: {
        data: nonNull(
          arg({
            type: 'SubmitDemoInput'
          })
        )
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.demo.create({
          data: {
            name: args.data.name,
            artistAlias: args.data.artistAlias,
            email: args.data.email,
            demoLink: args.data.demoLink,
            message: args.data.message,
            status: 'pending'
          }
        })
      }
    })
  }
})

const Demo = objectType({
  name: 'Demo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', {type: 'DateTime'})
    t.nonNull.field('updatedAt', {type: 'DateTime'})
    t.nonNull.string('name')
    t.nonNull.string('artistAlias')
    t.nonNull.string('demoLink')
    t.string('message')
    t.nonNull.string('status')
  }
})

const SubmitDemoInput = inputObjectType({
  name: 'SubmitDemoInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('artistAlias')
    t.nonNull.string('email')
    t.nonNull.string('demoLink')
    t.nonNull.string('message')
  }
})

export const schema = makeSchema({
  types: [Query, Mutation, Demo, DateTime, SubmitDemoInput],
  outputs: {
    schema: __dirname + '/../graphql/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})
