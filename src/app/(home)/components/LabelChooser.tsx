import { Label } from '@/types'
interface LabelChooserProps {
    selectedLabels: string[]
    setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>
}
const LabelChooser = (props: LabelChooserProps) => {
    const { selectedLabels, setSelectedLabels } = props
    const labelName = [
        { name: 'new', color: 'FBCA04' },
        { name: 'hot', color: 'F9D0C4' },
        { name: 'practice', color: 'C5DEF5' },
    ]
    const handleLabelChoose = (label: Label) => {
        const newSelectedLabels = [...selectedLabels]
        if (newSelectedLabels.includes(label.name)) {
            newSelectedLabels.splice(newSelectedLabels.indexOf(label.name), 1)
        } else {
            newSelectedLabels.push(label.name)
        }
        setSelectedLabels(newSelectedLabels)
    }

    return (
        <>
            {labelName.map((label, index) => (
                <button
                    key={index}
                    onClick={() => handleLabelChoose(label)}
                    style={{
                        backgroundColor: selectedLabels.includes(label.name) ? `#${label.color}` : 'transparent',
                        borderColor: `#${label.color}`,
                    }}
                    className="px-2 text-sm bg-transparent border-2 rounded-lg "
                >
                    {label.name}
                </button>
            ))}
        </>
    )
}

export default LabelChooser
