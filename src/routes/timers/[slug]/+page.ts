import type { PageLoad } from "./$types";

export const load:PageLoad = ({params}) => {
    return {
        set: params.slug
    }
}
