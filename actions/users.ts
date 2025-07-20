export async function subsribeToNewsletter(email: string) {
    try {
        const res = await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.error) {
            console.error("Error subscribing to newsletter:", data.error);
            return false;
        } else {
            return true
        }
    }
    catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return false
    }
}
export async function subscribeToPlan(email: string) {
    try {
        const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.error) {
            console.error("Error subscribing to pricing plan:", data.error);
            return false;
        } else {
            return true
        }
    }
    catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return false
    }
}