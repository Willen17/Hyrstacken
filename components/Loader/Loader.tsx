const Loader = () => {
    return (
        <div className="flex items-center justify-center flex-col font-bold text-center gap-y-5">
            <div className="mr-3 radial-progress animate-spin [--value:40]" />
            <p>Laddar...</p>
        </div>
    );
};

export default Loader;
