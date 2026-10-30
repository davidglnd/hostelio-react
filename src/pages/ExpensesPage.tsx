import { useSearchParams } from "react-router";
export const ExpensesPage = () => {
    const [searchParams] = useSearchParams();

    const supplierId = searchParams.get("proveedor");
    return (
        <div>supplierId: {supplierId}</div>
    )
}