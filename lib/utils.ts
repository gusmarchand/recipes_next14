export const normalize = (value: string) => {
    const s =
        value
            ?.normalize("NFD")
            .trim()
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() || "";
    return s;
};

