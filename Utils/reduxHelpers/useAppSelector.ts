import { TypedUseSelectorHook, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux/store"


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector