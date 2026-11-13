export interface FormErrors<T extends string> {
    fields: Partial<Record<T, string>>;
    general?: string;
}