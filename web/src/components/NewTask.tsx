import * as dayjs from 'dayjs';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TaskDTO } from '../dto/Task';

interface INewTaskProps {
    onCreate: (task: TaskDTO) => void;
    onClose: () => void;
}

export const NewTask = (props: INewTaskProps) => {
    const { onClose, onCreate } = props;

    const [loading, setLoading] = useState(false);


    const { register, handleSubmit, formState: { errors }, setError } = useForm<TaskDTO>(
        {
            defaultValues: {
                title: '',
                description: '',
                start: dayjs().format('YYYY-MM-DDTHH:mm'),
                end: dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
            }
        }
    );

    const onSubmit = async (data: TaskDTO) => {
        setLoading(true);
        onCreate(data);
        setLoading(false);
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 mx-auto w-1/2">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Nova Tarefa
                            </h3>
                        </div>
                        {/*body*/}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative p-6 flex-auto">
                                <div className="relative w-full flex flex-col">
                                    <label htmlFor='title' className="text-slate-500 text-sm font-semibold mb-2">Titulo</label>
                                    <input type="text" className="p-3 rounded-md shadow-md bg-neutral-100" disabled={loading} placeholder='Titulo da tarefa' {...register('title')} />
                                </div>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <div className="relative w-full flex flex-col">
                                    <label htmlFor='description' className="text-slate-500 text-sm font-semibold mb-2">Descricao</label>
                                    <input type="textarea" className="p-3 rounded-md shadow-md bg-neutral-100" disabled={loading} placeholder='Descrição' {...register('description')} />
                                </div>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <div className="relative w-full flex flex-col">
                                    <label htmlFor='description' className="text-slate-500 text-sm font-semibold mb-2">Início</label>
                                    <input type="datetime-local" className="p-3 rounded-md shadow-md bg-neutral-100" disabled={loading} placeholder='Data de ínicio' {...register('start')} />
                                </div>
                            </div>


                            <div className="relative p-6 flex-auto">
                                <div className="relative w-full flex flex-col">
                                    <label htmlFor='description' className="text-slate-500 text-sm font-semibold mb-2">Fim</label>
                                    <input type="datetime-local" className="p-3 rounded-md shadow-md bg-neutral-100" disabled={loading} placeholder='Data de termino' {...register('end')} />
                                </div>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent
                                            hover:bg-neutral-300 rounded
                                            font-bold uppercase px-6 py-3 text-sm outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all 
                                            duration-150
                                            disabled:opacity-50"
                                    type="button"
                                    disabled={loading}
                                    onClick={() => onClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-primary-500 text-white active:bg-primary-700
                                            hover:bg-primary-600
                                            font-bold uppercase text-sm px-6 py-3 rounded 
                                            shadow hover:shadow-lg outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                                            disabled:opacity-50"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Create Folder
                                </button>
                                {loading ?
                                    (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                    )
                                    : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
