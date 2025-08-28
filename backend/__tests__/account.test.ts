import request from "supertest"
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals"
import { IAccount } from "../src/models/accounts/account"
import repository from "../src/models/accounts/accountRepository"
import auth from "../src/auth"
import app from "../src/app"

const usernameTest = "Jest"
const emailTest = "jest@jest.com"
const usernameTest2 = "Jest1"
const emailTest2 = "jest1@jest.com"
let testId: number = 0
let jwt: string = ""

const payloadTest = {
    username: usernameTest2,
    email: emailTest2,
    password: "123456"
}

const payloadUpdated = {
    username: "Jest12",
    email: "Jest12@hotjest.com",
}

const payloadLogin = {
    email: emailTest,
    password: "123456"
}

beforeEach(async () => {
    const hashPassword = await auth.hashPassword("123456")
    const payload = {
        username: usernameTest,
        email: emailTest,
        password: hashPassword
    } as IAccount

    const accountTest = await repository.create(payload)
    testId = accountTest.id!
    jwt = auth.signJWT(testId)    
}) 

afterEach(async () => {
    await repository.removeByEmail(emailTest)
    await repository.removeByEmail(emailTest2)
    await repository.removeByEmail("Jest12@hotjest.com")

})

describe("Testando o controller do account", () => {
    it("GET ./accounts deve retornar 200", async () => {
        const result = await request(app)
                            .get("/accounts")
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(200)
    })

    it("GET ./accounts deve retornar 401", async () => {
        const result = await request(app)
                            .get("/accounts")
                            

        expect(result.status).toEqual(401)
        
    })

    it("GET ./accounts/:id deve retornar 200", async () => {
        const result = await request(app)
                            .get("/accounts/" + testId)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(200)
        
    })

    it("GET ./accounts/:id deve retornar 400", async () => {
        const result = await request(app)
                            .get("/accounts/asd")
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(400)
        expect(result.body.erro).toBe("Id invalido")
        
    })

    it("GET ./accounts/:id deve retornar 404", async () => {
        const result = await request(app)
                            .get("/accounts/-1")
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(404)
        expect(result.body.erro).toBe("Nenhum usuario encontrado")
        
    })

    it("POST ./accounts deve retornar 201", async () => {
        const result = await request(app)
                            .post("/accounts")
                            .send(payloadTest)

        expect(result.status).toEqual(201)
        expect(result.body.username).toBe(usernameTest2)
        
    })

    it("POST ./accounts deve retornar 400", async () => {
        const result = await request(app)
                            .post("/accounts")

        expect(result.status).toEqual(400)
        expect(result.body.erro).toBe("Informacoes invalidas")
        
    })

    it("POST ./accounts deve retornar 422", async () => {
        const payloadTest1 = {
        username: 12,
        email: emailTest2,
        password: "123456"
    }

        const result = await request(app)
                            .post("/accounts")
                            .send(payloadTest1)

        expect(result.status).toEqual(422)
        
    })

    it("PATCH ./accounts/:id deve retornar 200", async () => {
        const result = await request(app)
                            .patch("/accounts/" + testId )
                            .send(payloadUpdated)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(200)
        expect(result.body.username).toBe("Jest12")
        
    })

    it("PATCH ./accounts/:id deve retornar 400", async () => {
        const result = await request(app)
                            .patch("/accounts/asd" )
                            .send(payloadUpdated)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(400)
        expect(result.body.erro).toBe("Id invalido")
        
    })

    it("PATCH ./accounts/:id deve retornar 400", async () => {
        const result = await request(app)
                            .patch("/accounts/" + testId )
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(400)
        expect(result.body.erro).toBe("Informacoes invalidas")
        
    })

    it("PATCH ./accounts/:id deve retornar 422", async () => {
        const payloadUpdated422 = {
            username: 324
        }

        const result = await request(app)
                            .patch("/accounts/asd" )
                            .send(payloadUpdated422)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(422)
        
    })

    it("PATCH ./accounts/:id deve retornar 401", async () => {
        const result = await request(app)
                            .patch("/accounts/" + testId )
                            .send(payloadUpdated)

        expect(result.status).toEqual(401)
        
    })

     it("PATCH ./accounts/:id deve retornar 404", async () => {
        const result = await request(app)
                            .patch("/accounts/-1" )
                            .send(payloadUpdated)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(404)
        expect(result.body.erro).toBe("Usuario nao encontrado")
        
    })

    it("DELETE ./accounts/:id deve retornar 200", async () => {
        const result = await request(app)
                            .delete("/accounts/" + testId)
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(200)
        expect(result.body.message).toBe("Usuario deletado com sucesso")
        
    })

    it("DELETE ./accounts/:id deve retornar 400", async () => {
        const result = await request(app)
                            .delete("/accounts/asdf")
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(400)
        expect(result.body.erro).toBe("Id invalido")
        
    })

    it("DELETE ./accounts/:id deve retornar 401", async () => {
        const result = await request(app)
                            .delete("/accounts/" + testId)

        expect(result.status).toEqual(401)
        
    })

    it("DELETE ./accounts/:id deve retornar 404", async () => {
        const result = await request(app)
                            .delete("/accounts/-1")
                            .set("x-access-token", jwt)

        expect(result.status).toEqual(404)
        expect(result.body.erro).toBe("Usuario nao encontrado")
        
    })

    it("POST ./login deve retornar 200", async () => {
        const payloadTest1= {
             email: emailTest,
            password: "123456"
        }

        const result = await request(app)
                            .post("/login")
                            .send(payloadTest1)

        expect(result.status).toEqual(200)
        
    })
    
    it("POST ./login deve retornar 401 senha invalida", async () => {
        const payloadTest1= {
             email: emailTest,
            password: "1234567"
        }

        const result = await request(app)
                            .post("/login")
                            .send(payloadTest1)

        expect(result.status).toEqual(401)
        expect(result.body.erro).toBe("E-mail ou Senha invalido")
        
    })

    it("POST ./login deve retornar 401 usuario invalido", async () => {
        const payloadTest1= {
             email: "email@email.com",
            password: "123456"
        }

        const result = await request(app)
                            .post("/login")
                            .send(payloadTest1)

        expect(result.status).toEqual(401)
        expect(result.body.erro).toBe("E-mail ou Senha invalido")
        
    })

    it("POST ./login deve retornar 422", async () => {
        const payloadTest1= {
             email: "emailemail.com",
            password: "123456"
        }

        const result = await request(app)
                            .post("/login")
                            .send(payloadTest1)

        expect(result.status).toEqual(422)
        
    })
})