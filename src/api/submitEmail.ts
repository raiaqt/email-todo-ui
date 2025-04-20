export async function submitEmail(name: string, email: string): Promise<string> {
  const webhookURL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const body = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    console.log(body);
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    const result = await response.text();

    if (!response.ok) {
      throw new Error(result || "Failed to subscribe");
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
