interface BadgeProps {
    icon: React.ReactNode, 
    text?: string,
    isHighlight?: boolean  
}

const Badge = ({ icon, text, isHighlight = false }: BadgeProps) => (
    <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${isHighlight ? 'bg-sky-400/10 text-sky-400' : 'bg-neutral-800 text-neutral-400'}`}>
        <span className="text-sky-500">{icon}</span> {text}
    </div>
);

export default Badge;