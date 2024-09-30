from flask import Flask, request, jsonify
import os

app = Flask(__name__)
port = int(os.environ.get('PORT', 3000))

@app.route('/pass1', methods=['POST'])
def pass1_route():
    try:
        data = request.get_json()
        input = data.get('input')
        optab = data.get('optab')
        if not input or not optab or input == "" or optab == "":
            return "Both files need to be uploaded.", 400

        inputArr = [line.strip().split() for line in input.split('\n')]
        optabArr = [line.strip().split() for line in optab.split('\n')]

        pass1out = pass1(inputArr, optabArr)

        intermediateArr = [line.strip().split() for line in pass1out['intermediate'].split('\n')]
        symtabArr = [line.strip().split() for line in pass1out['symtab'].split('\n')]

        pass2out = pass2(optabArr, intermediateArr, symtabArr)
        if pass2out['output'] == "AUGEYSTOOOO" or pass2out['output2'] == "AUGEYSTOOOO":
            return "Assembler error.", 505

        pass2out['intermediate'] = pass1out['intermediate']
        pass2out['symtab'] = pass1out['symtab']
        return jsonify(pass2out)

    except Exception as err:
        return "Assembler error.", 500

def pass1(inputArr, optabArr):
    locctr = 0
    i = 1
    prev = locctr
    top = 0
    pos = -1
    interAddr = []
    symtabArr = [[]]
    intermediate = ""
    symtab = ""

    if inputArr[0][1] == 'START':
        locctr = int(inputArr[0][2], 16)
        prev = locctr

    while inputArr[i][1] != 'END':
        found = False
        opcode = inputArr[i][1]
        for op in optabArr:
            if op[0] == opcode:
                locctr += 3
                found = True
                break
        if not found:
            if inputArr[i][1] == 'WORD':
                locctr += 3
            elif inputArr[i][1] == 'RESW':
                locctr += 3 * int(inputArr[i][2])
            elif inputArr[i][1] == 'RESB':
                locctr += int(inputArr[i][2])
            elif inputArr[i][1] == 'BYTE':
                locctr += len(inputArr[i][2]) - 3
            else:
                print("Invalid opcode")

        top += 1
        interAddr.append(prev)
        i += 1
        prev = locctr

        if inputArr[i][0] != '-':
            flag = 0
            for sym in symtabArr:
                if sym[0] == inputArr[i][0]:
                    flag = 1
                    sym[2] = 1
            pos += 1
            symtabArr.append([inputArr[i][0], hex(prev)[2:], flag])

    top += 1
    interAddr.append(prev)

    intermediate = "-\t" + "\t".join(inputArr[0]) + "\n"
    for j in range(1, len(interAddr)):
        intermediate += hex(interAddr[j])[2:] + "\t" + "\t".join(inputArr[j]) + "\n"
    intermediate = intermediate.strip()

    for sym in symtabArr:
        symtab += "\t".join(map(str, sym)) + "\n"
    symtab = symtab.strip()

    return {'intermediate': intermediate, 'symtab': symtab}

def pass2(optabArr, intermediateArr, symtabArr):
    i = 1
    objectCodeArr = []

    while intermediateArr[i][2] != 'END':
        found = False
        for op in optabArr:
            if op[0] == intermediateArr[i][2]:
                found = True
                objectCode = op[1]
                for sym in symtabArr:
                    if sym[0] == intermediateArr[i][3]:
                        objectCode += sym[1]
                        objectCodeArr.append(objectCode)
        if not found:
            if intermediateArr[i][2] == 'WORD':
                val = int(intermediateArr[i][3])
                objectCode = hex(val)[2:].zfill(6)
                objectCodeArr.append(objectCode)
            elif intermediateArr[i][2] == 'BYTE':
                val = intermediateArr[i][3][2:-1]
                objectCode = ''.join([hex(ord(char))[2:] for char in val])
                objectCodeArr.append(objectCode)
            elif intermediateArr[i][2] in ['RESW', 'RESB']:
                objectCodeArr.append("\t")
        i += 1
    objectCodeArr.append("\t")

    output = "\t".join(intermediateArr[0]) + "\n"
    for j in range(1, len(intermediateArr)):
        output += "\t".join(intermediateArr[j]) + "\t" + objectCodeArr[j - 1] + "\n"

    lower = int(intermediateArr[1][0], 16)
    upper = int(intermediateArr[-1][0], 16)
    length = upper - lower
    output2 = f"H^{intermediateArr[0][1].ljust(6, '_')}^{intermediateArr[1][0]}^{hex(length)[2:].zfill(6)}\n\n"

    x = 1
    text = ""
    size = 0
    keri = False
    start = intermediateArr[x][0]
    while x < len(intermediateArr):
        keri = False
        if objectCodeArr[x - 1] == "\t":
            x += 1
            continue
        text += "^" + objectCodeArr[x - 1]
        size += len(objectCodeArr[x - 1]) // 2
        if size > 21:
            keri = True
            size -= len(objectCodeArr[x - 1]) // 2
            text = text[:-len(objectCodeArr[x - 1])-1]
            output2 += f"T^{start}^{hex(size)[2:].zfill(2)}{text}\n"
            start = intermediateArr[x][0]
            text = ""
            size = 0
            continue
        x += 1
    if not keri:
        output2 += f"T^{start}^{hex(size)[2:].zfill(2)}{text}\n\n"

    output2 += f"E^{intermediateArr[1][0]}"

    for sym in symtabArr:
        if sym[2] == 1:
            return {"output": "AUGEYSTOOOO", "output2": "AUGEYSTOOOO"}

    return {"output": output, "output2": output2}

@app.route('/reset', methods=['GET'])
def reset():
    try:
        files = ['input.txt', 'optab.txt', 'intermediate.txt', 'symtab.txt', 'output.txt']
        for file in files:
            os.remove(os.path.join('uploads', file))
        return 'Files deleted successfully.'
    except Exception as err:
        return "Error deleting files.", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)