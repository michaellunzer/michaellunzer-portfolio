// The emailed-resume flow is disabled. This endpoint used to accept any address
// and mail out a resume link, with no rate limiting or confirmation.
export async function POST() {
  return new Response(
    JSON.stringify({ error: 'The resume request form is no longer available.' }),
    {
      status: 410,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
