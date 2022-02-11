import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

process.env.ENV = "test"

import { User, OrderProducts, Product } from "../../utilities/helper";
import userModel from "../user";
import ProductModel from "../product";
import OrderModel from "../order";

describe("tests for users model", ()=>{
    beforeEach(()=>{
        console.log("**************************************************************************");
    })
    const userInstance = new userModel();
    it("expects index to return a type object", async ()=>{
        expect(typeof(await userInstance.index())).toBe("object");
    });

    it("expects show to return array", async ()=>{
        // const result = await userInstance.show(1);
        expect(typeof(await userInstance.show(1))).toBe("object");
    });

    it("expects the user and created user to have the same firstname", async ()=>{
        const user:User = {
            firstname: "some",
            lastname: "thing",
            password: "somethingElse"
        };

        const createdUserToken:string = await userInstance.create(user) as unknown as string;
        const createdUser:unknown = jwt.verify(createdUserToken, process.env.PVTKEY as unknown as string);
        expect((createdUser as User).firstname).toBe("some");
    });
})

describe("tests for order model", ()=>{
    beforeEach(()=>{
        console.log("**************************************************************************");
    });
    
    const orderInstance = new OrderModel();
    it("expects returning order of type object", async ()=>{
        expect(typeof(await orderInstance.getOrder(1))).toBe("object");
    });
});

describe("tests for product model", ()=>{
    beforeEach(()=>{
        console.log("**************************************************************************");
    })

    const productInstance = new ProductModel();
    it("expects index to return an object type.", async()=>{
        expect(typeof(await productInstance.index())).toBe("object");
    });
    it("expects show to return an object type.", async()=>{
        const product = await productInstance.show(1);
        expect(typeof(product)).toBe("object");
    });
    it("expects created product valeus to be the same", async()=>{
        const product:Product = {
            name: "productX",
            price: 1324
        };
        const result = await productInstance.create(product) as unknown as Product;

        expect(result.name).toBe("productX");
    })
});