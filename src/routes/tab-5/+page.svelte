<script lang="ts">
	import { jsPDF } from 'jspdf';
	import 'jspdf-autotable';

	let invoiceNumber = '';
	let invoiceDate = '';
	let dueDate = '';
	let clientName = '';
	let clientAddress = '';
	let items = [{ description: '', quantity: 1, unitPrice: 0, amount: 0 }];

	let subtotal = 0;
	let tax = 0;
	let total = 0;

	function addItem() {
		items.push({ description: '', quantity: 1, unitPrice: 0, amount: 0 });
		calculateTotals();
	}

	function removeItem(index: number) {
		items.splice(index, 1);
		calculateTotals();
	}

	function calculateTotals() {
		subtotal = items.reduce((acc, item) => acc + item.amount, 0);
		total = subtotal + tax;
	}

	// Generate PDF
	function generatePDF() {
		const doc = new jsPDF();

		// Add logo
		const logo = 'data:image/png;base64, ...'; // Replace with your logo's base64 string
		doc.addImage(logo, 'PNG', 15, 10, 30, 30);

		// Header
		doc.setFontSize(16);
		doc.text('Invoice', 160, 20);

		// Company Info
		doc.setFontSize(10);
		doc.text('Your company name', 15, 50);
		doc.text('Street address', 15, 55);
		doc.text('City, State, Zip code', 15, 60);
		doc.text('Phone# 555-555-5555', 15, 65);
		doc.text('Email address', 15, 70);
		doc.text('Website companyname.com', 15, 75);

		// Invoice Info
		doc.text('Invoice# 12345', 160, 50);
		doc.text('Invoice date mm/dd/yyyy', 160, 55);
		doc.text('Terms: Net 30', 160, 60);
		doc.text('Due date mm/dd/yyyy', 160, 65);

		// Address Details
		doc.text('Bill to:', 15, 90);
		doc.text('Client name', 15, 95);
		doc.text('Street address', 15, 100);
		doc.text('City, State, Zip code', 15, 105);

		doc.text('Ship to:', 90, 90);
		doc.text('Client name', 90, 95);
		doc.text('Street address', 90, 100);
		doc.text('City, State, Zip code', 90, 105);

		// Table
		const tableColumn = ['Description', 'Qty/Hrs', 'Rate', 'Amount'];
		const tableRows = items.map((item) => [
			item.description,
			item.quantity.toString(),
			`$${item.unitPrice.toFixed(2)}`,
			`$${item.amount.toFixed(2)}`
		]);

		doc.autoTable({
			startY: 115,
			head: [tableColumn],
			body: tableRows,
			styles: { halign: 'center' },
			theme: 'grid'
		});

		// Totals
		const tableEndY = doc.lastAutoTable.finalY + 10;
		doc.text('Customer message', 15, tableEndY);
		doc.text(
			'Hello! Thank you for your business. Please return this invoice with payment.',
			15,
			tableEndY + 10
		);

		doc.text('Subtotal:', 140, tableEndY);
		doc.text(`$${subtotal.toFixed(2)}`, 180, tableEndY);
		doc.text('Sales tax:', 140, tableEndY + 10);
		doc.text(`$${tax.toFixed(2)}`, 180, tableEndY + 10);
		doc.text('Total:', 140, tableEndY + 20);
		doc.setFontSize(12).text(`$${total.toFixed(2)}`, 180, tableEndY + 20);

		doc.save('invoice.pdf');
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Create Invoice</h1>

	<div class="mb-4 grid grid-cols-2 gap-4">
		<input type="text" bind:value={invoiceNumber} class="input" placeholder="Invoice Number" />
		<input type="date" bind:value={invoiceDate} class="input" placeholder="Invoice Date" />
		<input type="date" bind:value={dueDate} class="input" placeholder="Due Date" />
		<input type="text" bind:value={clientName} class="input" placeholder="Client Name" />
		<textarea bind:value={clientAddress} class="textarea" placeholder="Client Address"></textarea>
	</div>

	<table class="mb-4 w-full table-auto border">
		<thead>
			<tr class="bg-gray-200">
				<th class="p-2">Item</th>
				<th class="p-2">Qty</th>
				<th class="p-2">Unit Price</th>
				<th class="p-2">Amount</th>
				<th class="p-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item, index}
				<tr>
					<td><input bind:value={item.description} class="input" /></td>
					<td>
						<input
							type="number"
							bind:value={item.quantity}
							oninput={() => (item.amount = item.quantity * item.unitPrice)}
							class="input"
						/>
					</td>
					<td>
						<input
							type="number"
							bind:value={item.unitPrice}
							oninput={() => (item.amount = item.quantity * item.unitPrice)}
							class="input"
						/>
					</td>
					<td class="text-right">${item.amount.toFixed(2)}</td>
					<td>
						<button onclick={() => removeItem(index)} class="btn btn-danger"> Remove </button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<button onclick={addItem} class="btn btn-primary mb-4">Add Item</button>

	<div class="text-right">
		<p>Subtotal: ${subtotal.toFixed(2)}</p>
		<p>Tax: ${tax.toFixed(2)}</p>
		<p class="font-bold">Total: ${total.toFixed(2)}</p>
	</div>

	<button onclick={generatePDF} class="btn btn-success mt-4">Generate PDF</button>
</div>

<style>
	.input {
		border: 1px solid #ccc;
		padding: 8px;
		width: 100%;
	}
	.textarea {
		border: 1px solid #ccc;
		padding: 8px;
		width: 100%;
	}
	.btn {
		padding: 8px 12px;
		border: none;
		cursor: pointer;
	}
	.btn-primary {
		background-color: #3490dc;
		color: white;
	}
	.btn-danger {
		background-color: #e3342f;
		color: white;
	}
	.btn-success {
		background-color: #38c172;
		color: white;
	}
</style>
