interface DetailListProps {
    title: string,
    items?: string[]
}

const DetailList = ({ title, items }: DetailListProps) => {
    if (!items || items.length === 0 || items[0] === "") return null;
    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
            <ul className="list-disc ml-5 space-y-2 text-neutral-400">
                {items.map((item, idx) => (
                    <li key={idx} className="pl-1">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default DetailList;