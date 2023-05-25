const API_BASE = "http://localhost:3001/api";

enum ApiEndoints {
  "calculate" = "/calculate",
}

const callApi = async <T>(
  url: ApiEndoints,
  options: RequestInit
): Promise<T> => {
  const result = await fetch(`${API_BASE}${url}`, options);

  if (result.ok) {
    return result.json() as T;
  }

  throw new Error("Request failed");
};

export const calculate = async (payload: CalcInput) => {
  return callApi<CalcData>(ApiEndoints.calculate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
