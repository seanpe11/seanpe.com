export async function POST() {
  return {
    status: 200,
    headers: {
      'access-control-allow-origin': '*'
    },
    body: {
      'hello': "sean"
    }
  };
}
