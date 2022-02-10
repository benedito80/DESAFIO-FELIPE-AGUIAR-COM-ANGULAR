import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/usuario';

import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any;
  user = {} as Usuario;

  img: any;
  idUser = '';
  idPost = '';

  constructor(private service: UsuariosService, private http: HttpClient) {}

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.service.getUsuarios().subscribe((res: any[]) => {
      this.usuarios = res;
    });
  }

  deleteUser(usario: any) {
    if (confirm('Deseja realmente excluir este usuario?')) {
      this.service.deleteUser(usario._id).subscribe((success) => {
        this.service.deletePost(usario.post._id).subscribe((success) => {
          alert('Todos os dados foram excluido com sucesso');
          this.getUsuario();
        });
      });
    }
  }

  deletePost() {
    if (confirm('Deseja realmente substituir essa imagem e carregar outra?')) {
      this.service.deletePost(this.idPost).subscribe((success) => {
        alert('Imagem excluida');
        this.img = '';
      });
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as Usuario;
  }

  resetUser() {
    this.img = '';
    this.user = {} as Usuario;
  }

  editUser(usuario: any) {
    this.idUser = usuario._id;
    this.idPost = usuario.post._id;
    this.user = usuario;
    this.img = usuario.post.url;
  }

  saveUsers(form: NgForm) {
    if (this.user._id) {
      this.user.post = this.idPost;
      this.service.updateUser(this.user._id, this.user).subscribe(
        (success) => {
          alert('Atualizado com sucesso');
          this.getUsuario();
          this.cleanForm(form);
          //this.location.back();
          //this.router.navigate(['']);
        },
        (error) => alert('Erro interno')
      );
    } else {
      this.user.post = this.idPost;
      this.service.saveUser(this.user).subscribe(
        (success) => {
          alert('Usuário salvo com sucesso');
          this.getUsuario();
          this.cleanForm(form);
          //this.location.back();
          //this.router.navigate(['']);
        },
        (error) => alert('Erro interno')
      );
    }
  }

  postImagem(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post(`${environment.API}/posts`, formData)
        .subscribe((r: any) => {
          this.idPost = r.post._id;
          this.img = r.post.url;
        });
    }
  }
}
