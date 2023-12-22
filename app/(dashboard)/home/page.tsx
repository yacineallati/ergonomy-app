import Link from 'next/link'

const homepage = () => {
    return (
        <div className="flex flex-row gap-auto m-2.5 h-1/2 bg-primary">
            <div className="flex flex-col items-center justify-between m-2.5 gap-2.5">
            <Link href={'/todos'}>
            <div className="flex flex-row p-5 rounded-full bg-secondary shadow-lg">
                <h1>TO-DO list</h1>
                <h1>Production chart</h1>
            </div>
            </Link>
            <div className="p-5 rounded-full bg-secondary shadow-lg">
                <h1>Rapport</h1>
            </div>
            </div>
            <div className="w-[500px] p-5 rounded-full m-2.5 bg-secondary shadow-lg">
                <h1>Workers</h1>
            </div>
        </div>
    );
    }

export default homepage