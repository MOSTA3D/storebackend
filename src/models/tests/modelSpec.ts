import dotenv from "dotenv";
dotenv.config();

process.env.ENV = "test"

console.log("the env variables are ", process.env.ENV);

import { User, OrderProducts, Product } from "../../utilities/helper";
import userModel from "../user";
import ProductModel from "../product";
import OrderModel from "../order";

describe("tests for models", ()=>{
    beforeEach(()=>{
        console.log("**************************************************************************");
    })
    const userInstance = new userModel();
    it("expects index to return a type object", async ()=>{
        expect(typeof(await userInstance.index())).toBe("object");
    });

    it("expects index to return array", async ()=>{
        // const result = await userInstance.show(1);
        expect(typeof(await userInstance.show(1))).toBe("object");
    });

    it("expects index to return array", async ()=>{
        const user:User = {
            firstname: "some",
            lastname: "thing",
            password: "somethingElse"
        };

        const createdUser:User = await userInstance.create(user) as unknown as User;

        expect(createdUser.firstname).toBe("some");
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
    it("expects returning a object type.", async()=>{
        expect(typeof(await productInstance.index())).toBe("object");
    });
    it("expects returning an object type.", async()=>{
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