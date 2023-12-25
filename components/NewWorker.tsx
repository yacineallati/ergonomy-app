'use client'
import { NewWorker } from '@/util/api'
import { useRouter } from 'next/navigation' // Correct import from 'next/router' not 'next/navigation'

const NewWorkerComponent = () => { // Renamed to NewWorkerComponent to avoid naming conflict with NewWorker function
    const router = useRouter()
    const handleOnClick = async () => {
                const { data } = await NewWorker()
                router.push(`/Worker/${data.id}`)
        }
    return (
        <div className='flex justify-end items-center'>

        <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow w-18 h-12' onClick={handleOnClick}>
            <div className='px-4 py-5 sm:p-3'>
                <span className="text-Mint">New Worker</span>
            </div>
        </div>
        </div>
    )
}

export default NewWorkerComponent