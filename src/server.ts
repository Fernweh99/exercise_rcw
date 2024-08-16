import { ApiServer } from "./app";
import { InvestmentRoute } from "./routes/investment.route";

(async () => { 
    const server = new ApiServer();
    
    await server.initialize([new InvestmentRoute]);

    server.listen();
}) ()

