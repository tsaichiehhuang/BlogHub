import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

export default function MarkdownEditor(props: any) {
    const { body, setBody } = props

    return (
        <MdEditor
            modelValue={body}
            onChange={setBody}
            language="en-US"
            style={{
                height: '35vh',
                maxHeight: '35vh',
                backgroundColor: '#FAFAFA',
                borderRadius: '10px',
            }}
            previewTheme="default"
            autoDetectCode={true}
            toolbars={[
                'bold',
                'underline',
                'italic',
                '-',
                'strikeThrough',
                'title',
                'quote',
                'unorderedList',
                'orderedList',
                'task',
                '-',
                'codeRow',
                'code',
                'link',
                'table',
                '-',
                'revoke',
                'next',
            ]}
        />
    )
}
