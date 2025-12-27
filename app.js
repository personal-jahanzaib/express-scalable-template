import config from "#env";
import server from "#server";
import "#syncRoutes";

const a = 1;
const b = "2";
console.log(a + b);

server.listen(config.server.port, () => {
  console.info(`Server is running on port ${config.server.port}`);
});
