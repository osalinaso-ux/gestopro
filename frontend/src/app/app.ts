import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Producto, ProductosService } from './productos.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private servicio = inject(ProductosService);

  productos = signal<Producto[]>([]);
  form = signal<Producto>(this.vacio());
  editandoId = signal<string | null>(null);
  error = signal('');
  cargando = signal(false);

  totalExistencias = computed(() =>
    this.productos().reduce((suma, p) => suma + p.existencias, 0)
  );

  ngOnInit() {
    this.cargar();
  }

  private vacio(): Producto {
    return { nombre: '', categoria: '', precio: 0, existencias: 0 };
  }

  setCampo(campo: keyof Producto, valor: string | number) {
    this.form.update((f) => ({ ...f, [campo]: valor }));
  }

  cargar() {
    this.cargando.set(true);
    this.servicio.listar().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. ¿Está corriendo el backend?');
        this.cargando.set(false);
      },
    });
  }

  guardar() {
    this.error.set('');
    const id = this.editandoId();
    const peticion = id
      ? this.servicio.actualizar(id, this.form())
      : this.servicio.crear(this.form());

    peticion.subscribe({
      next: () => {
        this.cancelar();
        this.cargar();
      },
      error: (e) => this.error.set(e.error?.error ?? 'No se pudo guardar el producto'),
    });
  }

  editar(p: Producto) {
    this.form.set({ ...p });
    this.editandoId.set(p._id ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelar() {
    this.form.set(this.vacio());
    this.editandoId.set(null);
  }

  eliminar(p: Producto) {
    if (!p._id || !confirm(`¿Eliminar "${p.nombre}"?`)) return;
    this.servicio.eliminar(p._id).subscribe({
      next: () => this.cargar(),
      error: () => this.error.set('No se pudo eliminar el producto'),
    });
  }
}