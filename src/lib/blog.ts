// Municipality guides (category "district-guide") are reached from the
// homepage municipality strip and search engines, but are kept out of the
// journal lists. PostgREST filter: keep posts with no category or any other one.
export const DISTRICT_GUIDE_CATEGORY = "district-guide";
export const NOT_DISTRICT_GUIDE = `category.is.null,category.neq.${DISTRICT_GUIDE_CATEGORY}`;
