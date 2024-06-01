import Joi from 'joi';
import { useSearchParams } from 'react-router-dom'




function useEnsureCorrectPagination(minLimit: number = 9, maxLimit = 30) {
    const [searchParams, setSearchParams] = useSearchParams();
    const integerLimitSchema = Joi.number().min(minLimit).max(maxLimit).integer().required();
    const integerPageSchema = Joi.number().min(1).integer().required();

    function ensureCorrectPagination() {
        const { error: limitError } = integerLimitSchema.validate(Number(searchParams.get("limit")));
        const { error: pageError } = integerPageSchema.validate(Number(searchParams.get("page")));

        if (limitError || pageError) {
            searchParams.set("limit", "9");
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }

    return { ensureCorrectPagination, minLimit, maxLimit }
}

export default useEnsureCorrectPagination