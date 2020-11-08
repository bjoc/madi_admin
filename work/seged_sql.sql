SET SQL_SAFE_UPDATES = 0;
delete from madi.object_cats where not exists (select 1 from madi.Object where id = Object_id);
delete from madi.object_gallery where not exists (select 1 from madi.Object where id = Object_id);
delete from madi.object_keywords where not exists (select 1 from madi.Object where id = Object_id);
delete from madi.object_media where not exists (select 1 from madi.Object where id = Object_id);
delete from madi.object_period where not exists (select 1 from madi.Object where id = Object_id);
