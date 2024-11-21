export async function POST(request) {
    try {
      const body = await request.json();
      console.log('Received POST request with body:', body);
  
      // Simulate post creation (replace this with your actual logic)
      return new Response(
        JSON.stringify({ message: 'Post created successfully', data: body }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error handling POST request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create post' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  export async function OPTIONS() {
    return new Response(null, {
      status: 204,
      headers: {
        'Allow': 'POST, OPTIONS',
      },
    });
  }
  