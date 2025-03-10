export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { hostname, employees } = body;

  console.log('Data received:', { hostname, employees });

  return { answer: `Received from ${hostname} with ${employees} employees` };
})
