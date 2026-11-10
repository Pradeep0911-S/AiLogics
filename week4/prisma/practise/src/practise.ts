import { prisma } from "./config/prisma.client";

async function createOne(){
    const user = await prisma.user.create({
        data :{
            name : "dem",
            email : "demo@gmail.com",
            password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
            roleId : "c2422abc-a21f-4441-8e53-ffcf048d1695",
            isActive : false,
        },
    })
    await console.log(user);
}



async function createMore(){
    const user = await prisma.user.createMany({
        data :[{
            name : "dem",
            email : "demo3@gmail.com",
            password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
            roleId : "c2422abc-a21f-4441-8e53-ffcf048d1695",
            isActive : false,
        },
        {
            name : "dem",
            email : "demo5@gmail.com",
            password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
            roleId : "c2422abc-a21f-4441-8e53-ffcf048d1695",
            isActive : true,
        },
        {
            name : "dem",
            email : "deo3@gmail.com",
            password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
            roleId : "c2422abc-a21f-4441-8e53-ffcf048d1695",
            isActive : false,
        },
        ]
    })
    await console.log(user);
}


async function find(){
    const user  = await prisma.user.findUnique({
        where : {
            email : "admin@example.com",
        },
    })
    if(!user){
        console.log("user not found");
    }
    console.log(user);
    
}

async function findAll(){
    const user  = await prisma.user.findMany({
        where : {
            name : "dem"
        },
    })
    if(!user){
        console.log("user not found");
    }
    console.log(user);
    
}

async function joinInclude(){
    const user = await prisma.user.findUnique({
  where: {
    email: "admin@example.com",
  },
  include: {
    role: true,
    profile: true,
  },
});
console.log(user);

}


async function selectQuery(){
const users = await prisma.user.findMany({
    where:{
        name : "dem"
    },
    select : {
        email : true,
        isActive : true,
        profile : true
    }
})
console.log(users);

}

async function selectNested() {
    const user = await prisma.user.findUnique({
  where: {
    email: "admin@example.com",
  },
  select: {
    name: true,
    role: {
      select: {
        name: true,
        rolePermissions: {
          select: {
            permissionId : true,
            permission: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },
  },
});
console.dir(user, {depth : null});

}



async function UpdateOne(){
    const user = await prisma.user.update({
  where: {
    email: "demo@gmail.com",
  },
  data: {
    name: "Samuel",
  },
});

console.log(user);
}

async function UpdateMore(){
    const user = await prisma.user.updateMany({
  where: {
    isActive : false
  },
  data: {
    isActive : true
  },
});

console.log(user);
}



async function createUpdate() {
    const result = await prisma.user.upsert({
  where: {
    email: "sam@gmail.com",
  },
  update: {
    name: "Samuel",
  },
  create: {
    name: "Sam",
    email: "sam@gmail.com",
    password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
    roleId : "c2422abc-a21f-4441-8e53-ffcf048d1695"
  },
});
console.log(result);

}


await createUpdate();
