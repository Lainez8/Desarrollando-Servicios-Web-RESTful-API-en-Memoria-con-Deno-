import { Application, Router } from "https://deno.land/x/oak@v13.0.0/mod.ts";

const app = new Application();
const userRouter = new Router();

userRouter.get("/users", (context: any) => {
    context.response.body = "Metodo GET HTTP que actua sobre el recusro /users";
});

userRouter.get("/users/:username", (context: any) => {
    const username = context.params.username;
    context.response.body = `Metodo GET HTTP que actua sobre el recusro /users/${username}`;
});



app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log("Deno se esta ejecutando en http://localhost:8000/")
await app.listen({ port: 8000 });