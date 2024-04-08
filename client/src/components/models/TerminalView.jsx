import React from 'react';
import { Paper, Typography } from '@mui/material';

const TerminalView = () => {
    const terminalLines = [
        "from transformers import AutoTokenizer, AutoModelForCausalLM",
        "model_id = 'CohereForAI/c4ai-command-r-plus'",
        "tokenizer = AutoTokenizer.from_pretrained(model_id)",
        "model = AutoModelForCausalLM.from_pretrained(model_id)",
        "# Format message with the command-r-plus chat template",
        "messages = [{'role': 'user', 'content': 'Hello, how are you?'}]",
        "input_ids = tokenizer.apply_chat_template(messages, tokenize=True, add_generation_prompt=True, return_tensors='pt')",
        "## <BOS_TOKEN>Hello, how are you?",
        "gen_tokens = model.generate(input_ids, max_new_tokens=100, do_sample=True, temperature=0.3)",
        "gen_text = tokenizer.decode(gen_tokens[0])",
        "print(gen_text)"
    ];

    return (
        <>
            <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', marginTop:'2%' }}>Test the Model on Your Local Machine</Typography>
            <Paper elevation={3} style={{ marginTop: '1rem', marginBottom: '1rem', padding: '1rem', fontFamily: 'Roboto Mono, monospace', backgroundColor: '#1E1E1E', color: '#D4D4D4', borderRadius: '4px' }}>
                <div>
                    {terminalLines.map((line, index) => (
                        <div key={index} style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            <span style={{ color: '#fff' }}>{line}</span>
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
};

export default TerminalView;
