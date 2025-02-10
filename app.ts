import { 
    Application, 
    Router, 
    RouterContext
} from "https://deno.land/x/oak@v17.1.4/mod.ts";

const app = new Application();
const userRouter = new Router();

userRouter.get("/users", (context: any) => {
    const { response , request} = context;
    response.status = 200;
    response.body = {
        success: true,
        msg: "Metodo GET HTTP que actua sobre el recusro /users",
        data: "No hay data"
    }
});

userRouter.get("/users/:username", (context: any) => {
    const { response, params} = context;
    response.status = 200;
    response.body = {
        success: true,
        msg: `Metodo GET HTTP que actua sobre el recusro /users/${params.username}`,
        data: "No hay data"
    }
});

//TODO: Implementar el metodo POST  y recupear el body de la peticion
userRouter.post("/users/", async (context) => {
    const { response, request } = context;

    if (!request.hasBody) {
        response.status = 400;
        response.body = { success: false, msg: "No se ha enviado un cuerpo en la solicitud" };
        return;
    }

    const body = await request;

    console.log(body);

    response.status = 201;
    response.body = {
        success: true,
        msg: "Método POST HTTP que actúa sobre el recurso /users",
        data: "No hay data"
    };
});

userRouter.put("/users/:username", (context: any) => {
    const username = context.params.username;
    context.response.body = `Metodo PUT HTTP que actua sobre el recusro /users/${username}`;
});

userRouter.delete("/users/:username", (context: any) => {
    const username = context.params.username;
    context.response.body = `Metodo DELETE HTTP que actua sobre el recusro /users/${username}`;
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log("Deno se esta ejecutando en http://localhost:8000/")
await app.listen({ port: 8000 });