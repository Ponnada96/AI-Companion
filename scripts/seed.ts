const { PrismaClient } = require("@prisma/client")

import { futimes } from "fs";

const db = new PrismaClient();

async function main() {
    try {

        await db.category.createMany({
            data: [
                { name: "Famous People" },
                { name: "Movies & TV" },
                { name: "Musicians" },
                { name: "Games" },
                { name: "Animals" },
                { name: "Philosophy" },
                { name: "Scientists" },
            ]
        })
    }
    catch (error) {
        console.error("Error seeding default categories", error)
    }
    finally {
        await db.$disconnect();
    }
}

main()


