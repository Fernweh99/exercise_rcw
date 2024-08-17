import { ApiServer } from "./app";
import { AuthorizationRoute } from "./routes/authorization.route";
import { InvestmentRoute } from "./routes/investment.route";

(async () => { 
    const server = new ApiServer();
    
    await server.initialize([new InvestmentRoute, new AuthorizationRoute]);

    server.listen();
}) ()

