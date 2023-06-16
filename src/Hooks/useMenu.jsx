import {useQuery} from "@tanstack/react-query";

const useMenu = () => {

    const {data: menu = [], isLoading: loading} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('https://summer-camp-school-server-coral-one.vercel.app/menu')
            return res.json();
        }
    })
    return [menu, loading];
};

export default useMenu;