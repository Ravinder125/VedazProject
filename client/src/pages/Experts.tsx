import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounc";
import Search from "../components/Search";
import Container from "../components/ui/Container";
import Layout from "../components/ui/Layout";
import Pagination from "../components/Pagination";

interface Expert {
    _id: string;
    name: string;
    category: string;
    experience: number;
    rating: number;
}


const Experts = () => {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const debounce = useDebounce<string>(search, 1000)

    const fetchExperts = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/experts", {
                params: { page, search: debounce, category },
            });

            setExperts(data.data);
            setTotalPages(data.totalPages)
            console.log(data)
            setCategories(data.categories)
        } catch (error) {
            console.error("Error fetching experts");
        } finally {
            setLoading(false);
        }
    };

    const trimmedSearch = debounce?.trim()

    useEffect(() => {
        fetchExperts();

    }, [page, trimmedSearch, category]);

    if (loading) return <p>Loading experts...</p>;

    return (
        <Layout>
            <Container>

                <h1 className="text-3xl font-bold mb-6">Experts</h1>

                <div className="flex gap-4 mb-6">
                    <Search
                        placeholder="Search by name"
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border p-2 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {categories.map((c) => (
                            <option value={c}>{c}</option>

                        ))}
                        {/* <option value="Career">Career</option> */}
                    </select>
                </div>

                {loading && <p>Loading experts...</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experts.map((expert) => (
                        <div
                            key={expert._id}
                            className="bg-white p-4 rounded shadow border-2 border-white hover:border-primary transition-colors"
                        >
                            <h3 className="text-xl font-semibold">
                                {expert.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {expert.category}
                            </p>
                            <p>{expert.experience} years experience</p>
                            <p>⭐ {expert.rating.toFixed(1)}</p>

                            <Link
                                to={`/experts/${expert._id}`}
                                className="text-blue-600 font-medium mt-2 inline-block"
                            >
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    {/* <div className="flex justify-center items-center gap-2 ">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            disabled={page === 0}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 border rounded cursor-pointer disabled:cursor-not-allowed
                                 ${page === i + 1
                                        ? "bg-primary text-white"
                                        : ""
                                    }`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div> */}

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={(page: number) => setPage(page)}
                    />
                </div>
            </Container>

        </Layout>
    );
};

export default Experts;