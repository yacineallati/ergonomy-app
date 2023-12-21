import NewTodoForm from '@/components/NewTodoForm'
import { prisma } from '@/util/db'

const NewTodo = () => {
    const handleSubmit = async (data: any) => {
        const { title, startAt, endAt, type, muscle } = data;
        const newTodo = await prisma.todo.create({
            data: {
                title,
                startAt: new Date(startAt),
                endAt: new Date(endAt),
                type: parseInt(type),
                muscle: parseInt(muscle),
            },
        });
        console.log(newTodo);
    };

    return (
        <div>
            <h1>New Todo</h1>
            <NewTodoForm onSubmit={handleSubmit} />
        </div>
    );
};
